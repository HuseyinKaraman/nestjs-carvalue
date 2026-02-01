import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

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
  
  async findOne(id: string) {
    return this.repo.findOne({ where: { id: parseInt(id) } });
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
