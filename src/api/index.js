'use strict';
import axios from 'axios';
axios.defaults.baseURL = 'http://138.68.129.181/api';
export var api = {
	/**
     * Logs the user in for later requests.
     * @param {String} username : The username for the user 
     * @param {String} password : The password for the user
     */
	login: async function(username, password) {
		try {
			var response = await axios({
				method: 'post',
				url: '/auth/token/create/',
				data: {
					username: username,
					password: password
				}
			});
			axios.defaults.headers.common['Authorization'] = `Token ${response
				.data.auth_token}`;
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	/**
     * Get some data on all threads
     */
	getThreads: async function() {
		return axios({
			method: 'get',
			url: '/threads/'
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Make a new thread
	 */
	makeThread: function() {
		return axios({
			method: 'post',
			url: '/threads/'
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Rename the a given thread
	 * @param {String} threadUri : The uri of the thread to rename.
	 * @param {String} name : The new name of thread 
	 */
	renameThread: function(threadUri, name) {
		return axios({
			method: 'patch',
			url: `/threads/${threadUri}/`,
			data: {
				name: name
			}
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Leaves the given thread
	 * @param {String} threadUri : The uri of the thread. 
	 */
	leaveThread: async function(threadUri) {
		try {
			response = await axios({
				method: 'get',
				url: `/threads/${threadUri}/members/`
			});
			//TODO MAKE IT ONLY WORK IF YOU'RE AUTHENTICATED
			if (response.data.length == 1) {
				//You're the last user so delete the thread
				result = await axios({
					method: 'delete',
					url: `/threads/${threadUri}/`
				});
				return result.data;
			} else {
				//You're not the last user, so leave the thread
				result = await axios({
					method: 'delete',
					url: `/threads/${threadUri}/members/`
				});
				return result.data;
			}
		} catch (err) {
			console.log(err.response.data.detail);
		}
	},
	/**
	 * Adds a user of a given Uri to a given thread.
	 * @param {String} userUri : The uri of the user to be added.
	 * @param {String} threadUri : The uri of the thread the user will be added to.
	 */
	addUser: function(userUri, threadUri) {
		return axios({
			method: 'post',
			url: `/threads/${threadUri}/members/`,
			data: {
				user_uri: userUri
			}
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Sends a message of the given body to the given thread
	 * @param {String} message : The message to send
	 * @param {String} threadUri : The uri of the thread to send it to.
	 */
	sendMessage: function(message, threadUri) {
		return axios({
			method: 'post',
			url: `/threads/${threadUri}/message/`,
			data: {
				message: message
			}
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Gets 50 messages from the thread but ignores the most recent n messages. n being the number provided.
	 * @param {String} threadUri : The uri of the thread to get messages from.
	 * @param {Int} number : The number of messages to ignore before starting.
	 */
	getOlderMessages: function(threadUri, number) {
		return axios({
			method: 'patch',
			url: `/threads/${threadUri}/oldermessages/`,
			data: {
				backnumber: number
			}
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Sets the read receipt for the user on the thread given to be the current date and time.
	 * @param {String} threadUri : The uri of the thread which has been seen.
	 */
	seenThread: function(threadUri) {
		return axios({
			method: 'get',
			url: `/threads/${threadUri}/seen/`
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Get the logged in users profile
	 */
	getProfile: function() {
		return axios({
			method: 'get',
			url: '/profile/'
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	},
	/**
	 * Lists all user profiles
	 */
	listProfiles: function() {
		return axios({
			method: 'get',
			url: '/profiles/'
		})
			.then((result) => {
				return result.data;
			})
			.catch((err) => console.log(err));
	}
};
