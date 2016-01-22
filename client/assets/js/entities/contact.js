/**
 * Created by naved on 21/1/16.
 */
var Disa = Disa || {};

Disa.Contact = function () {

  /**
   * the display picture encoded
   * @type {string}
   */
  this.dp = "";

  /**
   * name of the contact
   * @type {string}
   */
  this.name = "";

  /**
   * the id of the contact(phone number etc)
   * @type {string}
   */
  this.id = "";

  /**
   * the service to which the contact belongs to
   * @type {string}
   */
  this.service = Disa.ServiceType.Text;
};
