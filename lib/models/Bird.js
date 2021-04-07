const pool = require("../utils/pool");

module.exports = class Bird {
  id;
  name;
  age;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.color = row.color;
  }

  static async insert({ name, age, color }) {
    const {
      rows,
    } = await pool.query(
      "INSERT INTO birds (name, age, color) VALUES ($1, $2, $3) RETURNING *",
      [name, age, color]
    );age

    return new Bird(rows[0]);
  }

  static async find() {
    const {
        rows
    } = await pool.query(
        'SELECT * FROM birds'
    ) 

    return rows.map((row) => new Bird(row));
}

static async findById(id) {
    const {
        rows
    } = await pool.query(
        'SELECT * FROM birds WHERE id=$1',
        [id]
    )

    return new Bird(rows[0]);
}

static async update(id, bird) {
    const {
        rows
    } = await pool.query(
        `UPDATE birds 
        SET name=$1, age=$2, color=$3
        WHERE id=$4
        RETURNING *`,
        [
            bird.name,
            bird.age,
            bird.color,
            id
        ]
    );

    return new Bird(rows[0]);
}
}
