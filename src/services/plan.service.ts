import pool from '../config/database'

export interface PlanData {
  user_id: number
  current_age: number
  retirement_age: number
  wist_to_live_till: number
  current_savings: number
  inflation_rate: number
  capital_gains_tax_rate: number
  income_tax_rate: number
  salary: number
  bonus: number
  investment_income: number
  rental_income: number
  other_income: number
  housing_cost: number
  transportation_cost: number
  food_cost: number
  utilities_cost: number
  insurance_cost: number
  entertainment_cost: number
  healthcare_cost: number
  debt_payments: number
  vpf_epf_ppf_amount: number
  vpf_epf_ppf_irr: number
  recurring_deposit_amount: number
  recurring_deposit_irr: number
  government_bills_amount: number
  government_bills_irr: number
  gold_amount: number
  gold_irr: number
  corporate_bonds_amount: number
  corporate_bonds_irr: number
  largecap_mutual_fund_amount: number
  largecap_mutual_fund_irr: number
  direct_stocks_amount: number
  direct_stocks_irr: number
  smallcap_mutual_fund_amount: number
  smallcap_mutual_fund_irr: number
}

export const createPlanData = async (planData: PlanData) => {
  const connection = await pool.getConnection()

  try {
    const query = `
      INSERT INTO plan (
        user_id, current_age, retirement_age, wist_to_live_till, current_savings,
        inflation_rate, capital_gains_tax_rate, income_tax_rate, salary, bonus,
        investment_income, rental_income, other_income, housing_cost, transportation_cost,
        food_cost, utilities_cost, insurance_cost, entertainment_cost, healthcare_cost,
        debt_payments, vpf_epf_ppf_amount, vpf_epf_ppf_irr, recurring_deposit_amount,
        recurring_deposit_irr, government_bills_amount, government_bills_irr, gold_amount,
        gold_irr, corporate_bonds_amount, corporate_bonds_irr, largecap_mutual_fund_amount,
        largecap_mutual_fund_irr, direct_stocks_amount, direct_stocks_irr,
        smallcap_mutual_fund_amount, smallcap_mutual_fund_irr
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
      planData.user_id,
      planData.current_age,
      planData.retirement_age,
      planData.wist_to_live_till,
      planData.current_savings,
      planData.inflation_rate,
      planData.capital_gains_tax_rate,
      planData.income_tax_rate,
      planData.salary,
      planData.bonus,
      planData.investment_income,
      planData.rental_income,
      planData.other_income,
      planData.housing_cost,
      planData.transportation_cost,
      planData.food_cost,
      planData.utilities_cost,
      planData.insurance_cost,
      planData.entertainment_cost,
      planData.healthcare_cost,
      planData.debt_payments,
      planData.vpf_epf_ppf_amount,
      planData.vpf_epf_ppf_irr,
      planData.recurring_deposit_amount,
      planData.recurring_deposit_irr,
      planData.government_bills_amount,
      planData.government_bills_irr,
      planData.gold_amount,
      planData.gold_irr,
      planData.corporate_bonds_amount,
      planData.corporate_bonds_irr,
      planData.largecap_mutual_fund_amount,
      planData.largecap_mutual_fund_irr,
      planData.direct_stocks_amount,
      planData.direct_stocks_irr,
      planData.smallcap_mutual_fund_amount,
      planData.smallcap_mutual_fund_irr,
    ]

    // Debug information
    console.log(
      'Number of placeholders in query:',
      (query.match(/\?/g) || []).length
    )
    console.log('Number of values:', values.length)
    console.log('Values:', values)

    const [result] = await connection.execute(query, values)
    return result
  } finally {
    connection.release()
  }
}

export const getPlanDataByUserId = async (userId: number) => {
  const connection = await pool.getConnection()

  try {
    const query =
      'SELECT * FROM plan WHERE user_id = ? ORDER BY id DESC LIMIT 1'
    const [rows] = await connection.execute(query, [userId])
    return rows
  } finally {
    connection.release()
  }
}
export const updatePlanData = async (planData: PlanData, id: number) => {
  const connection = await pool.getConnection()
  try {
    const query = `
      UPDATE plan SET
      current_age = ?,
      retirement_age = ?,
      wist_to_live_till = ?,
      current_savings = ?,
      inflation_rate = ?,
      capital_gains_tax_rate = ?,
      income_tax_rate = ?,
      salary = ?, 
      bonus = ?,
      investment_income = ?,
      rental_income = ?,
      other_income = ?,
      housing_cost = ?,
      transportation_cost = ?,
      food_cost = ?,
      utilities_cost = ?,
      insurance_cost = ?,
      entertainment_cost = ?,
      healthcare_cost = ?,
      debt_payments = ?,
      vpf_epf_ppf_amount = ?,
      vpf_epf_ppf_irr = ?,
      recurring_deposit_amount = ?,
      recurring_deposit_irr = ?,
      government_bills_amount = ?,
      government_bills_irr = ?,
      gold_amount = ?,
      gold_irr = ?,
      corporate_bonds_amount = ?,
      corporate_bonds_irr = ?,
      largecap_mutual_fund_amount = ?,
      largecap_mutual_fund_irr = ?,
      direct_stocks_amount = ?,
      direct_stocks_irr = ?,
      smallcap_mutual_fund_amount = ?,
      smallcap_mutual_fund_irr = ?
      WHERE id = ?
    `
    const values = [
      planData.current_age,
      planData.retirement_age,
      planData.wist_to_live_till,
      planData.current_savings,
      planData.inflation_rate,
      planData.capital_gains_tax_rate,
      planData.income_tax_rate,
      planData.salary,
      planData.bonus,
      planData.investment_income,
      planData.rental_income,
      planData.other_income,
      planData.housing_cost,
      planData.transportation_cost,
      planData.food_cost,
      planData.utilities_cost,
      planData.insurance_cost,
      planData.entertainment_cost,
      planData.healthcare_cost,
      planData.debt_payments,
      planData.vpf_epf_ppf_amount,
      planData.vpf_epf_ppf_irr,
      planData.recurring_deposit_amount,
      planData.recurring_deposit_irr,
      planData.government_bills_amount,
      planData.government_bills_irr,
      planData.gold_amount,
      planData.gold_irr,
      planData.corporate_bonds_amount,
      planData.corporate_bonds_irr,
      planData.largecap_mutual_fund_amount,
      planData.largecap_mutual_fund_irr,
      planData.direct_stocks_amount,
      planData.direct_stocks_irr,
      planData.smallcap_mutual_fund_amount,
      planData.smallcap_mutual_fund_irr,
      id,
    ]
    const [result] = await connection.execute(query, values)
    return result
  } finally {
    connection.release()
  }
}
