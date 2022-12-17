import {Logger} from '../Libs';
import {zohoCrmConfig} from '../config';
import {ZohoToken, Prisma} from '../prisma';

import axios from 'axios';
import moment from 'moment';

const Axios = axios.create();

function addMinutes() {
  let date = moment().add(55, 'minutes');
  return date;
}

interface IContact {
  firstName: string;
  lastName: string;
  email: string;
}

interface ITicket {
  contact: IContact;
  subject: string;
  description: string;
}

class ZohoService {
  static async generatingToken() {
    try {
      Logger.info('Generating Zoho Access Token');
      const {data} = await Axios.post(
        `https://accounts.zoho.com/oauth/v2/token?client_id=${zohoCrmConfig.clientID}&client_secret=${zohoCrmConfig.clientSecret}&grant_type=authorization_code&code=1000.2ab2114b505a42df9d4defd801dfe1ef.f144e4af5d59428d50ea1e9fd430f54e`
      );
      console.log(data, 'from xoho');
      const token = await this.saveToken({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: addMinutes().toString()
      } as ZohoToken);
      Logger.info(`Generated Zoho Access And Refresh Token`);
      data.token = token;
      return data;
    } catch (error: any) {
      Logger.error(
        `Error Generating Zoho Access And Refresh Token: ${JSON.stringify(
          error
        )}`
      );
      throw new Error('Error Generating Zoho Access And Refresh Token');
    }
  }
  static async fetchToken() {
    return await Prisma.zohoToken.findUnique({
      where: {id: '639ca03111f43a1124787cb6'}
    });
  }
  static async saveToken(data: ZohoToken) {
    return await Prisma.zohoToken.create({data});
  }
  static async destroy(id: string) {
    const find = await Prisma.zohoToken.delete({where: {id}});
    return find;
  }

  static async refreshingAccessToken(refresh_token: string | undefined) {
    try {
      Logger.info('Refreshing Token');
      const {data} = await Axios.post(
        `https://accounts.zoho.com/oauth/v2/token?client_id=${zohoCrmConfig.clientID}&client_secret=${zohoCrmConfig.clientSecret}&grant_type=refresh_token&refresh_token=${refresh_token}&scope=${zohoCrmConfig.scope}`
      );
      data.expires_in = addMinutes().toString();
      const updated = await Prisma.zohoToken.update({
        where: {id: '639ca03111f43a1124787cb6'},
        data: {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_in: data.expires_in
        }
      });
      Logger.info(`Generated Zoho Code: ${JSON.stringify(updated)}`);
      return updated;
    } catch (error) {
      Logger.error(`Error Generating Zoho Code: ${error}`);
      throw new Error('Error Generating Zoho Access And Refresh Token');
    }
  }

  static async createTicket(ticket: ITicket) {
    try {
      let zoho = await this.fetchToken();

      const iso = moment(zoho?.expires_in, 'DD MM YYYY hh:mm:ss').format();
      if (moment().isAfter(iso)) {
        zoho = await this.refreshingAccessToken(zoho?.refresh_token);
      }
      Logger.info('Creating Zoho Ticket');
      const {data} = await Axios.post(
        'https://desk.zoho.com/api/v1/tickets',
        ticket,
        {
          headers: {
            Authorization: `Bearer ${zoho?.access_token}`
          }
        }
      );
      Logger.info('Created Zoho Ticket');
      return data;
    } catch (error: any) {
      Logger.error(`Error Creating Zoho Ticket: ${JSON.stringify(error)}`);
      throw new Error('Error Creating Zoho Ticket');
    }
  }
}

export default ZohoService;
