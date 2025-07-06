import { Request, Response } from 'express'
import {
  createPlanData,
  updatePlanData,
  getPlanDataByUserId,
  PlanData,
} from '../services/plan.service'

export const createPlanDataController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { planData }: { planData: PlanData } = req.body
    console.log(planData)
    if (!planData || !planData.user_id) {
      return res.status(400).json({
        message: 'Invalid data provided. user_id is required.',
      })
    }
    const existingPlanData: any = await getPlanDataByUserId(planData.user_id)
    let result: any

    if (existingPlanData.length > 0) {
      // Update existing plan data
      result = await updatePlanData(planData, existingPlanData[0].id)
      res.status(200).json({
        message: 'Plan data updated successfully',
        planId: existingPlanData[0].id,
        updated: true,
      })
    } else {
      // Create new plan data
      result = await createPlanData(planData)
      res.status(201).json({
        message: 'Plan data created successfully',
        planId: (result as any).insertId,
        created: true,
      })
    }
  } catch (error) {
    console.error('Error creating/updating plan data:', error)
    res.status(500).json({
      message: 'Internal server error',
      error:
        process.env.NODE_ENV === 'development'
          ? (error as Error).message
          : undefined,
    })
  }
}

export const getPlanDataController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        message: 'id is required as a query parameter',
      })
    }

    const userId = parseInt(id as string)
    if (isNaN(userId)) {
      return res.status(400).json({
        message: 'id must be a valid number',
      })
    }

    const planData = await getPlanDataByUserId(userId)
    res.status(200).json({
      message: 'Plan data fetched successfully',
      data: planData,
    })
  } catch (error) {
    console.error('Error fetching plan data:', error)
    res.status(500).json({
      message: 'Internal server error',
      error:
        process.env.NODE_ENV === 'development'
          ? (error as Error).message
          : undefined,
    })
  }
}
