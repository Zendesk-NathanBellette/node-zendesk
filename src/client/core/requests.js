// File: requests.js: A Request is a Ticket object as seen by an end-user

/**
 * Class representing Ticket Requests.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/ |Zendesk Requests}
 */
const {Client} = require('../client');

class Requests extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['requests', 'request'];
    this.sideLoadMap = [
      {field: 'assignee_id', name: 'assignee', dataset: 'users'},
      {field: 'requester_id', name: 'requester', dataset: 'users'},
      {
        field: 'organization_id',
        name: 'organization',
        dataset: 'organizations',
      },
    ];
  }

  /**
   * List all ticket requests.
   * @async
   * @param {Object} [params] - Optional parameters.
   * @param {string} [params.sort_by] - Sort by "updated_at" or "created_at".
   * @param {string} [params.sort_order] - Sort order: "asc" or "desc".
   * @returns {Promise<Object[]>} List of ticket requests.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#list-requests}
   * @example const requests = await client.requests.list({ sort_by: 'updated_at', sort_order: 'desc' });
   */
  async list() {
    return this.getAll(['requests']);
  }

  /**
   * List all ticket requests that are open.
   * @async
   * @returns {Promise<Object[]>} List of open ticket requests.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#list-requests}
   * @example const openRequests = await client.requests.listOpen();
   */
  async listOpen() {
    return this.getAll(['requests', 'open']);
  }

  /**
   * List all ticket requests that are solved.
   * @async
   * @returns {Promise<Object[]>} List of solved ticket requests.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#list-requests}
   * @example const solvedRequests = await client.requests.listSolved();
   */
  async listSolved() {
    return this.getAll(['requests', 'solved']);
  }

  /**
   * List all CCD ticket requests.
   * @async
   * @returns {Promise<Object[]>} List of CCD ticket requests.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#list-requests}
   * @example const ccdRequests = await client.requests.listCCD();
   */
  async listCCD() {
    return this.getAll(['requests', 'ccd']);
  }

  /**
   * List all ticket requests by a specific user.
   * @async
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Object[]>} List of ticket requests for the specified user.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#list-requests}
   * @example const userRequests = await client.requests.listByUser(12345);
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'requests']);
  }

  /**
   * List all ticket requests by a specific organization.
   * @async
   * @param {number} orgID - The ID of the organization.
   * @returns {Promise<Object[]>} List of ticket requests for the specified organization.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#list-requests}
   * @example const orgRequests = await client.requests.listByOrganization(6789);
   */
  async listByOrganization(orgID) {
    return this.getAll(['organizations', orgID, 'requests']);
  }

  /**
   * Search for ticket requests.
   * @async
   * @param {Object} parameters - Search parameters.
   * @param {string} parameters.query - The query string.
   * @returns {Promise<Object[]>} List of matching ticket requests.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#search-requests}
   * @example const searchResults = await client.requests.search({ query: 'printer' });
   */
  async search(parameters) {
    return this.get(['requests', 'search', parameters]);
  }

  /**
   * Retrieve a specific ticket request.
   * @async
   * @param {number} requestId - The ID of the ticket request.
   * @returns {Promise<Object>} The ticket request details.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#show-request}
   * @example const requestDetails = await client.requests.show(1234);
   */
  async show(requestId) {
    return this.get(['requests', requestId]);
  }

  /**
   * Retrieve a specific ticket request.
   * @deprecated Use show instead
   */
  async getRequest(requestId) {
    return this.show(requestId);
  }

  /**
   * Create a new ticket request.
   * @async
   * @param {Object} requestDetails - Details of the ticket request to be created.
   * @returns {Promise<Object>} The created ticket request details.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#create-request}
   * @example
   * const newRequest = {
   *   subject: 'Help!',
   *   comment: {
   *     body: 'My printer is on fire!'
   *   }
   * };
   * const createdRequest = await client.requests.create(newRequest);
   */
  async create(requestDetails) {
    return this.post(['requests'], requestDetails);
  }

  /**
   * Update an existing ticket request.
   * @async
   * @param {number} requestId - The ID of the ticket request.
   * @param {Object} updateDetails - Details to update.
   * @returns {Promise<Object>} The updated ticket request details.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#update-request}
   * @example
   * const updatedInfo = {
   *   comment: {
   *     body: 'Thanks!'
   *   }
   * };
   * const updatedRequest = await client.requests.update(1234, updatedInfo);
   */
  async update(requestId, updateDetails) {
    return this.put(['requests', requestId], updateDetails);
  }

  /**
   * List all comments for a specific ticket request.
   * @async
   * @param {number} requestId - The ID of the ticket request.
   * @returns {Promise<Object[]>} List of comments for the ticket request.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#listing-comments}
   * @example const comments = await client.requests.listComments(1234);
   */
  async listComments(requestId) {
    return this.getAll(['requests', requestId, 'comments']);
  }

  /**
   * Retrieve a specific comment from a ticket request.
   * @async
   * @param {number} requestId - The ID of the ticket request.
   * @param {number} commentId - The ID of the comment to retrieve.
   * @returns {Promise<Object>} The comment details for the specified ticket request.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#listing-comments}
   * @example const comment = await client.requests.getComment(1234, 5678);
   */
  async getComment(requestId, commentId) {
    return this.getAll(['requests', requestId, 'comments', commentId]);
  }
}

exports.Requests = Requests;
