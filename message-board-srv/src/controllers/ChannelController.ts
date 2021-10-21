import express, { NextFunction, Request, Response } from 'express';
import { ChannelService } from 'services/ChannelService';
import { Action, BaseController } from 'share';
export class ChannelController extends BaseController {
  service = new ChannelService();
  bindings(): void {
    this.base = '/channels';
    this.router.get(this.base, this.all);
  }

  all: Action = async (req, res, next) => {
    const items = await this.service.all();
    res.status(200).json(items);
  };
}
