/* global QUnit */

sap.ui.define([
	"sap/ui/fl/apply/_internal/controlVariants/Utils",
	"sap/ui/core/Core"
],
function(
	VariantUtils,
	Core
) {
	"use strict";
	jQuery("#qunit-fixture").hide();
	var oComponent = Core.createComponent({
		name: "testComponent",
		id: "testComponent",
		metadata: {
			manifest: "json"
		}
	});

	QUnit.module("Given control", {}, function() {
		QUnit.test("when createVariant() is called", function(assert) {
			var oVariantSpecificData = {
				content: {
					fileName: "idOfVariantManagementReference",
					fileType: "variant",
					content: {
						title: "Standard"
					},
					variantManagementReference: "idOfVariantManagementReference"
				}
			};

			var oVariantModel = {
				oAppComponent: oComponent,
				sFlexReference: "Dummy.Component"
			};

			var oVariant = VariantUtils.createVariant({
				variantSpecificData: oVariantSpecificData,
				model: oVariantModel,
				appVersion: "1.0.0"
			});

			assert.ok(oVariant.isA("sap.ui.fl.Variant"));
			assert.strictEqual(oVariant.isVariant(), true);
			assert.strictEqual(oVariant.getTitle(), "Standard");
			assert.strictEqual(oVariant.getVariantManagementReference(), "idOfVariantManagementReference");
			assert.strictEqual(oVariant.getNamespace(), "apps/Dummy/variants/");
		});

		QUnit.test("when createVariant is called with a unstable variant management reference", function(assert) {
			var oVariantSpecificData = {
				content: {
					variantManagementReference: "__unstableComponent--variantMgmtRef"
				}
			};
			var oVariantModel = {
				oAppComponent: oComponent,
				sFlexReference: "Dummy.Component"
			};
			assert.throws(
				VariantUtils.createVariant.bind(null, {
					variantSpecificData: oVariantSpecificData,
					model: oVariantModel,
					appVersion: "1.0.0"
				}),
				new Error("Generated ID attribute found - to offer flexibility a stable VariantManagement ID is needed to assign the changes to, but for this VariantManagement control the ID was generated by SAPUI5 " + oVariantSpecificData.content.variantManagementReference),
				"then the correct error was thrown");
		});
	});
});