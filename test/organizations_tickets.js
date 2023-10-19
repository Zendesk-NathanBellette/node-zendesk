import path from 'node:path';
import dotenv from 'dotenv';
import {/* afterAll, */ describe, expect, it, beforeAll} from 'vitest';
import {back as nockBack} from 'nock';
import {setupClient} from './setup.js';

dotenv.config();

describe('Zendesk Client Organization Ticketrs', () => {

    const testOrganization = {
        name: 'xTestx Organization Tickets node-zendesk',
        id: 123412341234
    };

    const client = setupClient();

    beforeAll(async () => {
        nockBack.setMode('record');
        nockBack.fixtures = path.join(__dirname, '/fixtures');
    });

    it('retrieve a list of an organizations tickets', async () => {
        const {nockDone} = await nockBack('organizations_test_list_memberships.json');
        const result = await client.organizationmemberships.listByOrganization(testOrganization.id);

        expect(result[0].organization_name).toEqual(testOrganization.name);
        nockDone();
    });
});