const routes = require('express').Router();
const db = require('../config/db.config');
const { QueryTypes, col } = require('sequelize');
const Sequelize = require('sequelize');
const Customer = db.Customer;
const MegaTable = db.MegaTable;
const AnimalInfoTable = db.AnimalInfoTable;
const IntakeDateAgeTable = db.IntakeDateAgeTable;
const IntakeInfoTable = db.IntakeInfoTable;
const NoUseTable = db.NoUseTable;
const OutcomeDateAgeTable = db.OutcomeDateAgeTable;
const OutcomeInfoTable = db.OutcomeInfoTable;
const TimeInShelterTable = db.TimeInShelterTable;
const tables = {
    'in_out_mega': MegaTable,
    'animal_info': AnimalInfoTable,
    'intake': IntakeInfoTable,
    'outcome': OutcomeInfoTable
    // 'intake_date_age': IntakeDateAgeTable,
    // 'no_use': NoUseTable,
    // 'outcome_date_age': OutcomeDateAgeTable,
    // 'time_in_shelter': TimeInShelterTable
}

const search_sp = {
  'animal_info' : {
    'animal_id': 'search_id_animal_info'
  },
  'intake': {
    'animal_id': 'search_id_intake',
    'intake_datetime': 'search_date_intake',

  },
  'outcome': {
    'animal_id': 'search_id_outcome',
    'outcome_datetime': 'search_date_outcome'
  },
  'intake_and_outcome_join': {
    'animal_id': 'search_id_intake_outcome',
    'intake_datetime': 'search_intake_date_intake_outcome',
    'outcome_datetime': 'search_outcome_date_intake_outcome'
  }
}

const insert_sp = {
  'animal_info' : {
    sp: 'insert_new_animal',
    col_order: [
      "animal_id_intake",
		  "animal_type",
      "breed",
      "color",
      "date_of_birth"
    ]
  },
  'intake': {
    sp: 'insert_intake',
    col_order: [
      "animal_id_intake",
      "intake_datetime",
      "sex_upon_intake",
      "intake_type",
      "intake_condition",
      "found_location"
    ]
  },
  'outcome': {
    sp: 'insert_outcome',
    col_order: [
      "animal_id_intake",
			"outcome_datetime",
      "sex_upon_outcome",
			"outcome_type",
			"outcome_subtype"
    ]
  }
}


const update_sp = {
  'animal_info' : {
    sp: 'update_animal_info',
    col_order: [
      "animal_id_intake",
		  "animal_type",
      "breed",
      "color",
      "date_of_birth"
    ]
  },
  'intake': {
    sp: 'update_intake',
    col_order: [
      "animal_id_intake",
      "intake_number",
      "intake_datetime",
      "sex_upon_intake",
      "intake_type",
      "intake_condition",
      "found_location"
    ]
  },
  'outcome': {
    sp: 'update_outcome',
    col_order: [
      "animal_id_intake",
      "outcome_number",
			"outcome_datetime",
      "sex_upon_outcome",
			"outcome_type",
			"outcome_subtype"
    ]
  }
}

const delete_sp = {
  'animal_info' : {
    sp: "delete_id_animal_info",
    col_order: [ 'animal_id_intake'],
  },
  'intake': {
    sp: "delete_id_number_intake",
    col_order: ['animal_id_intake', 'intake_number']
  },
  'outcome': {
    sp: "delete_id_number_outcome",
    col_order: ['animal_id_intake', 'outcome_number']
  }
}

routes.get('', (req, res, next) => {
    res.end('DISPLAY DB DATA');
});


routes.get('/:db_obj/pagination', async (req, res) => {
  try {
      const db_obj = req.params.db_obj;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const offset = page ? page * limit : 0;
      console.log(db_obj, page, limit, offset);
      let query1 = "";
      if ( db_obj === 'intake_and_outcome_join') {
        query1 = `SELECT i.animal_id_intake, i.intake_number, i.intake_datetime, i.intake_weekday, i.age_upon_intake_years, i.sex_upon_intake, i.intake_type, i.intake_condition, i.found_location,
                  o.outcome_datetime, o.outcome_weekday, o.age_upon_outcome_years, o.sex_upon_outcome, o.outcome_type, o.outcome_subtype,
                  tis.time_in_shelter_days
                  FROM intake i
                  JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
                  JOIN time_in_shelter tis ON i.animal_id_intake = tis.animal_id_intake AND i.intake_number = tis.intake_number LIMIT ${offset}, ${limit};`;
      } else if ( db_obj === 'intake'){
        query1 = `SELECT animal_id_intake, intake_number, date_format(intake_datetime, '%Y-%m-%d %H:%i:%s') AS intake_datetime, intake_weekday,
                  age_upon_intake_years, age_upon_intake_days, sex_upon_intake, intake_type, intake_condition, found_location
                  FROM intake LIMIT ${offset}, ${limit};`

      } else if (db_obj === 'outcome') {
        query1 = `SELECT animal_id_intake, outcome_number, date_format(outcome_datetime, '%Y-%m-%d %H:%i:%s') AS outcome_datetime, outcome_weekday,
                  age_upon_outcome_years, age_upon_outcome_days, sex_upon_outcome, outcome_type, outcome_subtype
                  FROM outcome LIMIT ${offset}, ${limit};`
      } else {
        query1 = `SELECT * FROM ${db_obj} LIMIT ${offset}, ${limit};`;
      }

      const results = await db.sequelize.query(query1, { type: Sequelize.QueryTypes.SELECT });
      const columns = Object.keys(results[0]);
      console.log(columns);
      let query2 = "";
      if ( db_obj === 'intake_and_outcome_join') {
        query2 = `SELECT COUNT(*) AS TOTAL_ROWS
                  FROM intake i
                  JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
                  JOIN time_in_shelter tis ON i.animal_id_intake = tis.animal_id_intake AND i.intake_number = tis.intake_number LIMIT ${offset}, ${limit};`;
      } else {
        query2 = `SELECT count(*) AS TOTAL_ROWS FROM ${db_obj};`;
      }
      let column_values = {};
      const totalRows = await db.sequelize.query(query2, { type: Sequelize.QueryTypes.SELECT });
      console.log(totalRows[0]["TOTAL_ROWS"]);
      if ( db_obj === 'animal_info' || db_obj ===  'intake' || db_obj === 'outcome') {
        // const query3 = `SELECT COLUMN_NAME,DATA_TYPE  from INFORMATION_SCHEMA.COLUMNS where
        // table_schema = 'austin_animal_center' and table_name = '${db_obj}';`;
        // const columns_type = await db.sequelize.query(query3, { type: Sequelize.QueryTypes.SELECT });
        // console.log(columns_type);
        // data_types = {};
        // columns_type.forEach((column_type, index, array) => {
        //   if (insert_sp[db_obj]["col_order"].includes(column_type["COLUMN_NAME"])){
        //     console.log(column_type["COLUMN_NAME"]);
        //     data_types[column_type["COLUMN_NAME"]] = column_type["DATA_TYPE"];
        //   }
        // });
        insert_sp[db_obj]["col_order"].forEach(element=> {
          column_values[element] = null;
        })
      }
      console.log(results);
      const response = {
        "totalItems": totalRows[0]["TOTAL_ROWS"],
        "columns": columns,
        "tableData": results,
        "column_values": column_values
      };
      return res.json(response);
  } catch (error) {
      const response = {
        "totalItems": 0,
        "columns": ["db_result"],
        "tableData": [{db_result: "No rows returned"}],
        "message": "Error-> Cannot complete a paging request!",
        "error": error.message
      };
      res.json(response);
  }
});


routes.get('/search/:table/:column/:value', async (req, res) => {
  try {
      const table = req.params.table;
      const column = req.params.column;
      const value = req.params.value;
      console.log(table, column, value);
      const sp = search_sp[table][column];
      const query1 = `CALL ${sp}("${value}")`;
      console.log(query1);
      const results = await db.sequelize.query(query1);
      console.log(results);
      if( results && !results.length ) {
        return res.status(404).json({
          message: "No rows returned for the search parameters"
        })
      }
      const columns = Object.keys(results[0]);
      console.log(columns);
    return res.json({
      tableData: results,
      columns: columns
    });
  } catch(err) {
    console.log(err);
  }
});



routes.post('/insert/:table', async (req, res) => {
  try {
      const table = req.params.table;
      const row = req.body.data;
      console.log(req.body);
      const sp = insert_sp[table]["sp"];
      const col_order = insert_sp[table]["col_order"];
      console.log(sp);
      console.log(col_order);
      let query = `CALL ${sp}(`;
      col_order.forEach((columnName, index, arr) => {
        query += `"${row[columnName]}"`
        if (index !== arr.length - 1) {
          query += ","
        }
      });
      query += ");"
      console.log(query);
      const results = await db.sequelize.query(query);
      console.log(results)
      if( results && results.length > 0 ) {
        return res.status(404).json({
          message: "Insert Failed",
          error_msg: results[0].message
        });
      }
    return res.status(200).json();
  } catch(err) {
    console.log(err);
    return res.status(404).json({
      message: "Insert Failed",
      error_msg: err.original.sqlMessage
    });
  }
});


routes.post('/update/:table', async (req, res) => {
  try {
      const table = req.params.table;
      const row = req.body.data;
      console.log(req.body);
      const sp = update_sp[table]["sp"];
      const col_order = update_sp[table]["col_order"];
      console.log(sp);
      console.log(col_order);
      let query = `CALL ${sp}(`;
      col_order.forEach((columnName, index, arr) => {
        if (columnName === 'intake_datetime' || columnName === 'outcome_datetime'){
          query += `DATE_FORMAT('${row[columnName]}', '%Y-%m-%d %H:%i:%s')`
        } else {
          query += `"${row[columnName]}"`
        }
        if (index !== arr.length - 1) {
          query += ","
        }
      });
      query += ");"
      console.log(query);
      const results = await db.sequelize.query(query);

      if( results && results.length > 0 ) {
        return res.status(404).json({
          message: "Update Failed",
          error_msg: results[0].message
        });
      }
    return res.status(200).json();
  } catch(err) {
    console.log(err);
    return res.status(404).json({
      message: "Update Failed",
      error_msg: err.original.sqlMessage
    });
  }
});


routes.delete('/delete/:table', async (req, res) => {
  try {
      const table = req.params.table;
      const sp = delete_sp[table]["sp"];
      const col_order = delete_sp[table]["col_order"];
      let query = `CALL ${sp}(`;
      col_order.forEach((columnName, index, arr) => {
        let value = req.query[columnName];
        if (columnName === 'intake_number' || columnName === 'outcome_number') {
          query += `${value}`
        } else {
          query += `"${value}"`
        }

        if (index !== arr.length - 1) {
          query += ","
        }
      });
      query += ");"
      console.log(query);
      const results = await db.sequelize.query(query);

      if( results && results.length > 0 ) {
        return res.status(404).json({
          message: "Delete Failed",
          error_msg: results[0].message
        });
      }
    return res.status(200).json();
  } catch(err) {
    console.log(err);
    return res.status(404).json({
      message: "Delete Failed",
      error_msg: err.original.sqlMessage
    });
  }
});

routes.get('/summary', async (req, res) => {
  try {
    const query1 = 'SELECT COUNT(*) as animals_count FROM animal_info;';
    const results1 = await db.sequelize.query(query1, { type: Sequelize.QueryTypes.SELECT });
    const query2 = `SELECT animal_type, count(animal_type) as  type_count, count(animal_type) / (select count(animal_type) from animal_info) * 100 as percent
                    FROM animal_info
                    group by animal_type
                    ORDER BY type_count DESC
                    LIMIT 5;`;
    const results2 = await db.sequelize.query(query2, { type: Sequelize.QueryTypes.SELECT });
    const query3 = `SELECT outcome_type, count(outcome_type) as type_count, count(outcome_type) / (select count(outcome_type) from outcome) * 100 as percent
                    from outcome
                    group by outcome_type
                    ORDER BY type_count DESC
                    LIMIT 5;`;
    const results3 = await db.sequelize.query(query3, { type: Sequelize.QueryTypes.SELECT });
    console.log(results1);
    console.log(results2);
    console.log(results3);
    const response = {
      "animals_count": results1,
      "animals_type_count": results2,
      "outcome_type_count": results3
    };
    console.log(response)
    return res.json(response);
  } catch (error) {
    console.log(error);
  }

});



module.exports = routes;
