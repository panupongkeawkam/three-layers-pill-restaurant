# เว็บสั่งอาหารและจัดการร้านโดยเม็ดยาสามชั้น *(อยู่ระหว่างการพัฒนา)*
> Guideline
1. รันไฟล์ `schema.sql`
2. แก้ไข `config.js`
```javascript
{ password: '<รหัสผ่านของ Database>' }
```
3. รันคำสั่ง `npm run serve` ใน Terminal
4. สำหรับหน้าสั่งอาหารของลูกค้าให้ตั้ง responsive เป็นมือถือ (iPhone SE, iPhone XR, iPhone 12 Pro)
---
> Path Access
* ลิงค์สำหรับโต๊ะ 1, 2, ... (ลูกค้า): [http://localhost:3000/table/1/home](http://localhost:3000/table/1/home), [http://localhost:3000/table/2/home](http://localhost:3000/table/2/home), [http://localhost:3000/table/.../home](http://localhost:3000/table/.../home) <br>

* ลิงค์สำหรับเข้าสู่ระบบ (พนักงาน): [http://localhost:3000/admin/login](http://localhost:3000/admin/login) *(ชื่อผู้ใช้และรหัสผ่านดูใน `routes/employee.js:12, 13`)*