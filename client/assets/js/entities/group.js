/**
 * Created by naved on 21/1/16.
 */
var Disa = Disa || {};
/**
 * Constructor for group type
 * @constructor
 */
Disa.Group =  function(){

  /**
   * represents the display picture
   * @type {string}
   */
  this.dp = "";


  /**
   * the name of the group
   * @type {string}
   */
  this.name = "";

  /**
   * Members of this group
   * @type {Array} of {Contact}
   */

  this.members = [];

  /**
   * Indicates the service this group belongs to
   * @type {string}
   */
  this.service = Disa.ServiceType.Text;

};
