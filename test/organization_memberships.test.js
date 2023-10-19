import path from 'node:path';
import dotenv from 'dotenv';
import {/* afterAll, */ describe, expect, it, beforeAll, afterAll} from 'vitest';
import {back as nockBack} from 'nock';
import {setupClient} from './setup.js';
import {uniqueOrgName, uniqueUserName} from "../src/clients/helpers";

dotenv.config();

describe('Zendesk Client Organization Memberships', () => {
    let testOrganization = {};
    let testOrganizationMembership = {};
    let testUser = {};

    const client = setupClient();

    const createTestOrganization = async () => {
        const {nockDone} = await nockBack('organization_memberships_membership_test_setup.json');
        const {result} = await client.organizations.create({
            organization: {name: uniqueOrgName(25)},
        });
        testOrganization = result;
        nockDone();
    }

    const createTestUser = async () => {
        const {nockDone} = await nockBack('organization_memberships_user_test_setup.json');
        const {result} = await client.users.create({
            user: {name: uniqueUserName(25)}
        });
        testUser = result;
        nockDone();
    }

    beforeAll(async () => {
        nockBack.setMode('record');
        nockBack.fixtures = path.join(__dirname, '/fixtures');
        await createTestOrganization();
    });

    it('should create a new organization membership', async () => {
        await createTestUser();
        const {nockDone} = await nockBack('organization_memberships_test_setup.json');
        const {result} = await client.organizationmemberships.create({
            organization_membership: {
                organization_id: testOrganization.id,
                user_id: testUser.id
            }
        });
        expect(result.user_id).toEqual(testUser.id);
        expect(result.organization_id).toEqual(testOrganization.id)
        nockDone();
    });

    it('should retrieve a list of organization memberships', async () => {
        const {nockDone} = await nockBack('organizations_test_list_memberships.json');

        const result = await client.organizationmemberships.listByOrganization(testOrganization.id);

        expect(result[0].name).toEqual(testOrganizationMembership.name);
        nockDone();
    });

    const cleanupOrganizationMembershipData = async () => {
        const {nockDone} = await nockBack('organization_memberships_test_cleanup.json');
        await client.organizationmemberships.delete(testOrganizationMembership.id);
        nockDone();
    };

    const cleanupOrganizationData = async () => {
        const {nockDone} = await nockBack('organization_memberships_membership_test_cleanup.json');
        await client.organizations.delete(testOrganization.id);
        nockDone();
    };

    const cleanupUserData = async () => {
        const {nockDone} = await nockBack('organization_memberships_user_test_cleanup.json');
        await client.users.delete(testUser.id);
        nockDone();
    }

    afterAll(async () => {
        await cleanupOrganizationMembershipData();
        await cleanupOrganizationData();
        await cleanupUserData();
    });
});