/**
 * Created by naved on 21/1/16.
 */
var Disa = Disa || {};

/**
 * Chat class representing the chats for the app
 * @param type the type of the Chat. can be "solo" or "party"
 * @constructor
 */
Disa.Chat = function (type) {

  /**
   * Chat type, solo or group
   * @type {{Solo: string, Party: string}}
   */
  this.Type = {
    Solo:"solo",
    Party:"party"
  };

  /**
   * depending on the type, the contact will be a group or a contact
   */
  if(type == this.Type.Solo) {
    this.contact = new Disa.Contact();
  }else{
    this.contact = new Disa.Group();
  }

  /**
   * The bubbles belonging to the chat
   * @type {Array} of {Disa.Bubble}
   */
  this.bubbles = [];

  /**
   * the services the chat belongs to
   * @type {Array}
   */
  this.services = []

  /**
   * The primary service of the chat
   * @type {string}
   */
  this.primaryService = Disa.ServiceType.Text;

};
