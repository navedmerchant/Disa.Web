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
   * depending on the type, the contact will be a group or a contact
   */
  if(type === Disa.Chat.Type.Solo) {
    this.contact = new Disa.Contact();
  }else{
    this.contact = new Disa.Group();
  }

  /**
   * The bubbles belonging to the chat
   * @type {Array} of {Disa.Bubble}
   */
  this.bubbles = [];

  this.getChatPreview = function () {
    var chatPreview = this.bubbles[this.bubbles.length-1];
    if(chatPreview){
      //TODO:handle all types here
      var preview = chatPreview.content;

      if(chatPreview.Type = Disa.Bubble.BubbleType.Text){

        if(chatPreview.messageType == Disa.Bubble.MessageType.sent){
          preview = "You: " + chatPreview.content;
        }

        if(preview.length <= 35){
          return preview;
        }
        else{
          return preview.substr(0,32) + '...';
        }
      }
    }
    else{
      return "";
    }
  };

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


/**
 * Chat type, solo or group
 * @type {{Solo: string, Party: string}}
 */
Disa.Chat.Type = {
  Solo:"solo",
  Party:"party"
};
