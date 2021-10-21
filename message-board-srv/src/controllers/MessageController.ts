import express, { NextFunction, Request, Response } from 'express';
import { PushService } from 'services';
import { ChannelService } from 'services/ChannelService';
import { MessageService } from 'services/MessageService';
import { Action, BaseController } from 'share';
export class MessageController extends BaseController {
  service = new MessageService();
  bindings(): void {
    this.base = '/messages';
    this.router.get(`${this.base}/:channelId`, this.getMessagesById);
    this.router.post(`${this.base}/:channelId`, this.createMessage);
  }

  getMessagesById: Action = async (req, res, next) => {
    const items = await this.service.getByChannelId(+req.params.channelId);
    res.status(200).json(items);
  };

  createMessage: Action = async (req, res, next) => {
    const item = await this.service.create({ channelId: +req.params.channelId, ...req.body }, req.headers['x-device-id'] as string);
    res.status(200).json(item);
  };
}
