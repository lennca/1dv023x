import axios from 'axios'

/**
 * Controller class for the API route.
 */
class ApiController {
  /**
   * Method of controller class that makes a put-request to Gitlab API and updates the state of an issue.
   *
   * @param {object} req Express request object
   * @param {object} res Express reponse object
   * @param {Function} next Express middleware next function
   * @returns {object} Respose object with status code and data
   */
  async update (req, res, next) {
    try {
      const { PRIVATE_TOKEN, PROJECT_ID } = process.env

      const { state, id } = req.params
      // domain = l*u
      const url = `https://gitlab.<domain>.se/api/v4/projects/${PROJECT_ID}/issues/${id}?state_event=${state}`

      const response = await axios.put(url, {}, { headers: { 'PRIVATE-TOKEN': `${PRIVATE_TOKEN}` } })

      res.status(response.status).json(response.data)
    } catch (error) {
      res.status(error.response.status).send(error.response.data.message)
    }
  }
}

export default ApiController
