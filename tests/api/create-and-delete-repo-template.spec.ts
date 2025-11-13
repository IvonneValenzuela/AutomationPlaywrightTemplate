import { test, expect, } from '@playwright/test';

const USER = process.env.GH_USER;
const REPOTEST = process.env.GH_TEST_REPO;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const THREE_SECONDS = 3000;

test.beforeAll(async ({ request }) => { //Using to create a new repo that we will delete after use it 
    const response = await request.post('user/repos', {
        data: {
            name: REPOTEST
        }
    });
    expect(response.ok()).toBeTruthy();
});

test('Verify the ability to create a bug in the repository', async ({ request }) => { // skipped because running it created a bug in the repository I'm currently working on

    const newIssue = await request.post(`/repos/${USER}/${REPOTEST}/issues`, {
        
        data: {
            title: '[Bug] API test posting a new issue',
            body: 'Bug created successfully',
        }
    });

    expect(newIssue.status()).toBe(201);
    console.log('STATUS:', newIssue.status());
    
    await delay(THREE_SECONDS);

    const issues = await request.get(`/repos/${USER}/${REPOTEST}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] API test posting a new issue',
        body: 'Bug created successfully'
    }));
});


test.afterAll(async ({ request }) => { //Using to delete the repo with the issues created on it
    const response = await request.delete(`/repos/${USER}/${REPOTEST}`);
    expect(response.ok()).toBeTruthy();
});