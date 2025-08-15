import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { Signal } from './signal.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('signals')
@Controller('signals')
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all signals' })
  @ApiResponse({ status: 200, description: 'Returns list of signals', type: [Signal] })
  async findAll() {
    return this.signalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a signal by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single signal', type: Signal })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async findOne(@Param('id') id: string) {
    return this.signalsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new signal' })
  @ApiResponse({ status: 201, description: 'Signal created successfully', type: Signal })
  async create(@Body() createData: Signal) {
    return this.signalsService.processAndSaveSignal(createData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a signal by ID' })
  @ApiResponse({ status: 200, description: 'Signal updated successfully', type: Signal })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async update(@Param('id') id: string, @Body() updateData: Partial<Signal>) {
    return this.signalsService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a signal by ID' })
  @ApiResponse({ status: 200, description: 'Signal deleted successfully', type: Signal })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async delete(@Param('id') id: string) {
    return this.signalsService.delete(id);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filter signals by deviceId and/or fromTime' })
  @ApiResponse({ status: 200, description: 'Returns filtered list of signals', type: [Signal] })
  async filter(@Query('deviceId') deviceId: string, @Query('fromTime') fromTime: number) {
    return this.signalsService.findWithFilter({ deviceId, fromTime });
  }
}