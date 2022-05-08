import request from 'supertest';
import { Express } from 'express-serve-static-core';
import { createServer } from '../../server';
import * as _ from 'lodash';
import { testData } from '../../testdata/test.data';

let server: Express;

beforeAll(async () => {
    server = await createServer();
});

describe('address', () => {
    describe('p2wpkh', () => {
        it('should return 200 & valid response if correct request param is set', async (done) => {
            const body = { seed: testData.masterSeed, path: testData.hdPath };
            request(server)
                .post(`/api/v1/p2wpkh`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(body)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toMatchObject({ p2wpkh: 'bc1qqunvanrnp0r5n0t5ml3dfnk4pdpxfs7wzdkyqj' });
                    done();
                });
        });
        it('should return 400 & invalid response if seed was not passed', async (done) => {
            const errBody = { path: testData.hdPath };
            request(server)
                .post(`/api/v1/p2wpkh`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(errBody)
                .expect(400)
                .end(done);
        });
        it('should return 400 & invalid response if path was not passed', async (done) => {
            const errBody = { seed: testData.masterSeed };
            request(server)
                .post(`/api/v1/p2wpkh`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(errBody)
                .expect(400)
                .end(done);
        });
        it('should return 500 & invalid response if path is invalid', async (done) => {
            const errBody = { seed: testData.masterSeed, path: 'path to Rome' };
            request(server)
                .post(`/api/v1/p2wpkh`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(errBody)
                .expect(500)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toMatchObject({ error: 'Invalid Paths Pattern' });
                    done();
                });
        });
        it('should return 500 & invalid response if seed is invalid', async (done) => {
            const errBody = { seed: 'magic bean', path: testData.hdPath };
            request(server)
                .post(`/api/v1/p2wpkh`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(errBody)
                .expect(500)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toMatchObject({ error: 'Invalid seed' });
                    done();
                });
        });
    });
    describe('p2sh', () => {
        it('should return 200 & valid response if correct request param is set', async (done) => {
            const body = { m: testData.m, pubKeys: testData.publicKeys };
            request(server)
                .post(`/api/v1/p2sh`)
                .set('Content-Type', 'application/json')
                .send(body)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toMatchObject({ p2sh: '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC' });
                    done();
                });
        });
        it('should return 400 & invalid response if pubkeys was not passed', async (done) => {
            const errBody = { m: testData.m };
            request(server)
                .post(`/api/v1/p2sh`)
                .set('Content-Type', 'application/json')
                .send(errBody)
                .expect(400)
                .end(done);
        });
        it('should return 400 & invalid response if m was not passed', async (done) => {
            const errBody = { pubKeys: testData.publicKeys };
            request(server)
                .post(`/api/v1/p2sh`)
                .set('Content-Type', 'application/json')
                .send(errBody)
                .expect(400)
                .end(done);
        });
        it('should return 500 & invalid response if public keys is invalid', async (done) => {
            const errKeys = _.cloneDeep(testData.publicKeys);
            errKeys[0] = "Noah's Magic Key";
            const errBody = { m: testData.m, pubKeys: errKeys };
            request(server)
                .post(`/api/v1/p2sh`)
                .set('Content-Type', 'application/json')
                .send(errBody)
                .expect(500)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.error).toContain('Invalid key');
                    done();
                });
        });
        it('should return 500 & invalid response if seed is invalid', async (done) => {
            const errBody = { m: 5, pubKeys: testData.publicKeys };
            request(server)
                .post(`/api/v1/p2sh`)
                .set('Content-Type', 'application/json')
                .send(errBody)
                .expect(500)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).toMatchObject({ error: 'm should less than the amount of pub keys' });
                    done();
                });
        });
    });
});
