import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>
  ) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = await this.repo
    .create({
      ...reportDto,
      user: user
    });
    return this.repo.save(report);
  }

  async createEstimate({ make, model, year, mileage, lat, lng }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
    .select('AVG(price)', 'price')
    .where('LOWER(make) = LOWER(:make)', { make })
    .andWhere('LOWER(model) = LOWER(:model)', { model })
    .andWhere('ABS(lat - :lat) <= 5', { lat })
    .andWhere('ABS(lng - :lng) <= 5', { lng })
    .andWhere('ABS(year - :year) <= 3', { year })
    .andWhere('approved IS TRUE')
    .orderBy('ABS(mileage - :mileage)', 'DESC')
    .setParameters({ mileage })
    .limit(3)
    .getRawMany();
  }
  
  async findOne(id: string) {
    return this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async delete(id: string) {
    const report = await this.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return this.repo.remove(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report =  await this.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

}
