const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


describe('TASK API', () => {
  let mongoServer, response;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGODB_URI = `${mongoUri}tasks`;

    const initTask = { title: 'New TASK Item', description: 'Adding a new task item' };
    response = await request(app).post('/api/tasks').send(initTask);
  });
  
  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await app.close()
  });


  describe('Retrieve all Task /tasks', () => {
    it('should return all TASK items', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining([
        expect.objectContaining({ title: 'New TASK Item', description: 'Adding a new task item'  }),
      ]));
     
    });
  });

  describe('Get Task /tasks/:id', () => {
    it('should return all TASK items', async () => {
      const res = await request(app).get(`/api/tasks/${response.body._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({ title: 'New TASK Item', description: 'Adding a new task item'  }),
      );
    });
  });

  describe('POST /tasks', () => {
    it('should create a new TASK item', async () => {
      const task = { title: 'New TASK Item 1', description: 'Adding a new task item' };
      const res = await request(app).post('/api/tasks').send(task);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(task);
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update a TASK item', async () => {
      const task = { title: 'Updated TASK Item', description: 'Updating a new task item' };
      const res = await request(app).patch(`/api/tasks/${response.body._id}`).send(task);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(task);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a TASK item', async () => {
      const res = await request(app).delete(`/api/tasks/${response.body._id}`);
      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
      
    });
  });

  describe('Mark task as completed /tasks/:id/completed', () => {
    it('should update task status as completed', async () => {
      const res = await request(app).patch(`/api/tasks/${response.body._id}/completed`).send({});
      expect(res.status).toBe(200);
      expect(res.body.status).toEqual("completed");
      
    });
  });

  describe('Filtering logic for task', () => {
    beforeAll(async() => {
      const task1 = { title: 'Task 1', description: 'Description 1', dueDate: '2023-06-01', status: 'pending' };
      const task2 = { title: 'New Task 2', description: 'Description 2', dueDate: '2023-06-02', status: 'completed' };
      const task3 = { title: 'Task 3', description: 'Description 3', dueDate: '2023-06-03', status: 'pending' };
      await mongoose.connection.collection('tasks').insertMany([task1, task2, task3]);
    })
    describe('Filter Task by Due Date /tasks?dueDate=', () => {
      it('should return TASK items with due date of 2023-06-01', async () => {
        const dueDate = '2023-05-31';
        const res = await request(app).get(`/api/tasks?dueDate=${dueDate}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([
          expect.objectContaining({ title: 'Task 1', description: 'Description 1', dueDate: dueDate, status: 'pending' }),
        ]));
        
      });
    
      it('should return an empty array for a non-existent due date', async () => {
        const dueDate = '2023-06-01';
        const res = await request(app).get(`/api/tasks?dueDate=${dueDate}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
        
      });
    });
  
    describe('Filter Task by Title /tasks?title=', () => {
      it('should return TASK items with title containing "New"', async () => {
        const title = 'New';
        const res = await request(app).get(`/api/tasks?title=${title}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([
          expect.objectContaining({ title: 'New Task 2', description: 'Description 2', dueDate: '2023-06-02', status: 'completed'  }),
        ]));
        
      });
    
      it('should return an empty array for a non-existent title', async () => {
        const title = 'Non-existent';
        const res = await request(app).get(`/api/tasks?title=${title}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
        
      });
    });
  
    describe('Filter Task by Status /tasks?status=', () => {
      it('should return TASK items with status "completed"', async () => {
        const status = 'completed';
        const res = await request(app).get(`/api/tasks?status=${status}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([
          expect.objectContaining({ title: 'New Task 2', description: 'Description 2', dueDate: '2023-06-02', status  }),
        ]));
        
      });
    
      it('should return an empty array for a non-existent status', async () => {
        const status = 'non-existent';
        const res = await request(app).get(`/api/tasks?status=${status}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
        
      });
    });  
  });
});
