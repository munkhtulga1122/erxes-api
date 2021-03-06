import * as request from 'supertest';

import { app } from '../index';
import { smsRequestFactory, telnyxWebhookDataFactory } from '../models/factories';
import './setup';

describe('HTTP endpoint tests', () => {
  test('Test /telnyx/webhook', async () => {
    const smsRequest = await smsRequestFactory({});
    const webhookParams = {
      from: '+13322200406',
      to: '+97688276317',
      telnyxId: smsRequest.telnyxId,
    };
    const webhookData = telnyxWebhookDataFactory(webhookParams);

    const response = await request(app)
      .post('/telnyx/webhook')
      .send(webhookData);

    const { status, data } = response.body;

    expect(status).toBeDefined();
    expect(status).toBe('ok');
    expect(data).toBeDefined();
    expect(data.payload).toBeDefined();
    expect(data.payload.from).toBe(webhookParams.from);
    expect(data.payload.id).toBe(webhookParams.telnyxId);
  });
});
