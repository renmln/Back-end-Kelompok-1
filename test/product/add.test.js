const request = require('supertest');
const app = require('../../app');
const path = require('path')

const image1 = path.resolve(__dirname, '../file/car01.min.jpg');
const image2 = path.resolve(__dirname, '../file/car02.min.jpg');
const image3 = path.resolve(__dirname, '../file/car08.min.jpg');
const image4 = path.resolve(__dirname, '../file/car12.min.jpg');

const id_seller = 1;
const product_name = 'Product example';
const price = 100000;
const category = 'Kendaraan';
const description = 'Description example'
const image_1 = 'https://res.cloudinarycom/imgExample1';
const image_2 = 'https://res.cloudinarycom/imgExample2';
const image_3 = 'https://res.cloudinarycom/imgExample3';
const image_4 = 'https://res.cloudinarycom/imgExample4';
const status = 'offered';

describe('POST /api/v1/product', () => {
  let product;

  it('should response with 201 as status code', async () => {
    const accessToken = await request(app).post('/api/v1/login').send({
      email: 'testing@gmail.com',
      password: '12345',
    });

    return request(app)
      .post('/api/v1/product')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
      .attach('picture', image1)
      .attach('picture', image2)
      .attach('picture', image3)
      .attach('picture', image4)
      .send({
        id_seller, product_name, price, category, description,
        image_1, image_2, image_3, image_4, status
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
          id: expect.any(Number),
          id_seller: expect.any(Number),
          product_name: expect.any(String),
          price: expect.any(Number),
          category: expect.any(String),
          description: expect.any(String),
          image_1: expect.any(String),
          image_2: expect.any(String),
          image_3: expect.any(String),
          image_4: expect.any(String),
          status: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        product = res.body;
      });
  });

  it('should response with 401 as status code', async () => {
    const accessToken = await request(app).post('/api/v1/login').send({
      email: 'testing@gmail.com',
      password: '12345',
    });

    return request(app)
      .post('/api/v1/product')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
      .send({
        id_seller, product_name, price, category, description,
        image_1, image_2, image_3, image_4, status
      })
      .then((res) => {
        expect(res.status).toBe(401);
        if (res.body.details === null) {
          expect(res.body).toEqual({
            error: expect.objectContaining({
              name: expect.any(String),
              message: expect.any(String),
              details: null,
            }),
          });
          return;
        }
        expect(res.body).toEqual({
          error: expect.objectContaining({
            name: expect.any(String),
            message: expect.any(String),
            details: expect.objectContaining({
              role: expect.any(String),
              reason: expect.any(String),
            }),
          }),
        });
      });
  });

  afterAll(async () => {
    const accessToken = await request(app).post('/v1/auth/login').send({
      email: 'testing@gmail.com',
      password: '12345',
    });

    return request(app)
      .delete(`/api/v1/product/${product.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken.body.accessToken}`);
  });
});
