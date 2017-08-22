'use strict';

import * as types from './actionTypes';
import firebaseService from '../../services/firebase';

const FIREBASE_REF_MESSAGES = firebaseService.database().ref('Messages');
const FIREBASE_REF_MESSAGES_LIMIT = 20;

export function sendMessage(message) {
  return (dispatch) => {
    dispatch(chatMessageLoading());

    let currentUser = firebaseService.auth().currentUser;
    let date = new Date();
    let dateString = date.toTimeString();
    let chatMessage = {
      text: message,
      time: dateString,
      user: {
        id: currentUser.uid,
        email: currentUser.email
      }
    }

    FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        dispatch(chatMessageError(error.message));
      } else {
        dispatch(chatMessageSuccess());
      }
    });
  }
}

export function updateMessage(text) {
  return (dispatch) => {
    dispatch(chatUpdateMessage(text));
  }
}

export function loadMessages() {
  return (dispatch) => {
    FIREBASE_REF_MESSAGES.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
      dispatch(loadMessagesSuccess(snapshot.val()));
    }, (errorObject) => {
      dispatch(loadMessagesError(errorObject.message));
    });
  }
}

function chatMessageLoading() {
  return {
    type: types.CHAT_MESSAGE_LOADING,
  }
}

function chatMessageSuccess() {
  return {
    type: types.CHAT_MESSAGE_SUCCESS,
  }
}

function chatMessageError(error) {
  return {
    type: types.CHAT_MESSAGE_ERROR,
    error,
  }
}

function chatUpdateMessage(text) {
  return {
    type: types.CHAT_MESSAGE_UPDATE,
    text,
  }
}

function loadMessagesSuccess(messages) {
  return {
    type: types.CHAT_LOAD_MESSAGES_SUCCESS,
    messages,
  }
}

function loadMessagesError(error) {
  return {
    type: types.CHAT_LOAD_MESSAGES_ERROR,
    error,
  }
}
