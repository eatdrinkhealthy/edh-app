// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import type { IMeteorError } from "meteor/meteor";
import type { IVenue } from "../../state/reducers/searchResultsReducers";

const testFilterList = [
  {
    id: "juiceBar",
    name: "Juice Bars",
    on: true,
    foursquareCategory: "4bf58dd8d48988d112941735",
  },
];

if (Meteor.isClient) {
  describe("Methods - client calls", function () {
    this.timeout(4000);

    describe("Meteor.call('getNearbyPlaces')", function () {
      it("should NOT throw, but get callback with empty results, when foursquareApi throws",
        function (done: (Error | void) => void) {
          const args = {
            latitude: 0,
            longitude: 0,
            eatDrinkFilters: testFilterList,
          };

          assert.doesNotThrow(() => {
            Meteor.call("getNearbyPlaces", args,
              function (err: IMeteorError, res: Array<IVenue>) {
                assert.isUndefined(err);
                assert.deepEqual(res, []);
                done();
              },
            );
          });
        },
      );

      it("should get a ValidationError, when schema validation fails", function (done) {
        const args = {
          latitude: "not a number",
          longitude: 0,
          eatDrinkFilters: testFilterList,
        };

        assert.doesNotThrow(() => {
          Meteor.call("getNearbyPlaces", args,
            function (err: IMeteorError, res: Array<IVenue>) {
              assert.isUndefined(res);
              assert.isDefined(err);

              //
              // doing a detailed examination of a ValidationError here, to learn
              // the structure and some values
              //
              // NOTE: tried using ValidationError.is() from mdg:validation-error, but
              // it does not return true for the returned error
              //

              assert.equal(err.error, "validation-error");
              // $FlowFixMe   (it's okay if err.details is undefined here, will throw as it should
              assert.deepEqual(err.details[0],
                {
                  name: "latitude",
                  value: "not a number",
                  type: "expectedType",
                  dataType: "Number",
                  message: "Latitude must be of type Number",
                },
              );
              done();
            },
          );
        });
      });
    });
  });
}
