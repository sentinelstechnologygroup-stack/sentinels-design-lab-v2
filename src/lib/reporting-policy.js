export const REPORTING_POLICY = {
  actionPlanMilestones: [30, 60, 90, 120],
  connectionRerunDays: 60,
  changeNotice:
    "Report findings are a time-stamped view of the available evidence. Rankings, traffic, competitors, advertising results, and conversion performance can change after the report is generated.",
  limitedDataNotice:
    "Advanced reports combine public market research with private business data that only the owner can authorize. If a required account is not connected, the report will identify the missing source and clearly label affected findings as limited or not verified.",
  rerunNotice:
    "If required accounts were not connected when an advanced report was produced, the customer may request one complimentary rerun after connecting them within 60 days of the original report date.",
};

export const SIS_INSTRUMENTATION_STATUS = [
  {
    site: "PremierKitchens.us",
    status: "Instrumentation-ready",
    detail:
      "Live SIS hooks recognize page views, CTA, phone, email, link, and form-attempt activity. The secure collection endpoint still must be activated before this data can support reporting.",
  },
  {
    site: "ELILandDesign.com",
    status: "Instrumentation-ready",
    detail:
      "Live SIS hooks recognize page, CTA, gallery, form, phone, email, and outbound-link activity. The secure collection endpoint still must be activated before this data can support reporting.",
  },
  {
    site: "MyBuddysMobileDetail.com",
    status: "Not yet instrumented",
    detail:
      "The current live build does not expose the SIS tracking hooks and must be instrumented before it can contribute first-party activity data.",
  },
];
