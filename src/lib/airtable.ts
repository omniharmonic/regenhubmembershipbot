import Airtable from 'airtable';
import { MembershipApplication, AirtableConfig } from '@/types';
import { subDays, startOfDay, endOfDay } from 'date-fns';

export class AirtableService {
  private base: Airtable.Base;
  private tableName: string;

  constructor(config: AirtableConfig) {
    this.base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);
    this.tableName = config.tableName;
  }

  async getRecentApplications(daysBack: number = 7): Promise<MembershipApplication[]> {
    try {
      const cutoffDate = subDays(new Date(), daysBack);
      const startDate = startOfDay(cutoffDate);
      const endDate = endOfDay(new Date());

      console.log(`Fetching applications from ${startDate.toISOString()} to ${endDate.toISOString()}`);

      const records = await this.base(this.tableName)
        .select({
          filterByFormula: `AND(
            IS_AFTER({Created}, '${startDate.toISOString()}'),
            IS_BEFORE({Created}, '${endDate.toISOString()}')
          )`,
          sort: [{ field: 'Created', direction: 'desc' }]
        })
        .all();

      console.log(`Raw Airtable records:`, JSON.stringify(records.map(r => ({ id: r.id, fields: r.fields })), null, 2));

      return records.map(record => ({
        id: record.id,
        createdTime: record.get('Created') as string,
        fields: record.fields
      }));
    } catch (error) {
      console.error('Error fetching applications from Airtable:', error);
      throw new Error('Failed to fetch applications from Airtable');
    }
  }

  async getAllApplications(): Promise<MembershipApplication[]> {
    try {
      const records = await this.base(this.tableName)
        .select({
          sort: [{ field: 'Created', direction: 'desc' }]
        })
        .all();

      return records.map(record => ({
        id: record.id,
        createdTime: record.get('Created') as string,
        fields: record.fields
      }));
    } catch (error) {
      console.error('Error fetching all applications from Airtable:', error);
      throw new Error('Failed to fetch applications from Airtable');
    }
  }
}
