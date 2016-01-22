/**
 * Created by naved on 21/1/16.
 */
var Disa = Disa || {};
/**
 * Bubble Class representing the text message in the application
 * @constructor returns a new instance of the Bubble class
 */
Disa.Bubble = function(){

  /**
   * An Enum representing the type of bubble
   * @type {{Text: string, Image: string, Audio: string, Video: string}}
   */
  this.BubbleType = {
    Text:"text",
    Image:"image",
    Audio:"audio",
    Video:"video"

  };


  /**
   * True if the bubble is of an abstract type.
   * @type {boolean}
   */
  this.abstract = false;


  /**
   * Field representing the content that this bubble has.
   * @type {string}
   */
  this.type = this.BubbleType.Text;

  /**
   * the content of this bubble. will be the text or the encoded stuff.
   * @type {string}
   */
  this.content = "";

  /**
   * the timestamp of this bubble.
   * @type {Date}
   */
  this.timeStamp = new Date();

  /**
   * The service that this bubble belongs to.
   * @type {string}
   */
  this.service = Disa.ServiceType.Text;

};
