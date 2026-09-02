export const REPORTING_POLICY = {
  actionPlanMilestones: [30, 60, 90, 120],
  connectionRerunDays: 60,
  changeNotice:
    "Report findings are a time-stamped view of the available evidence. Rankings, traffic, competitors, advertising results, and conversion performance can change after the report is generated.",
  limitedDataNotice:
    "Advanced reports combine public market research with private business data that only the owner can authorize. If a required account is not connected, the report will identify the missing source and clearly label affected findings as limited or not verified.",
  rerunNotice:
    "Every paid advanced report includes one complimentary reevaluation after the missing required accounts are connected within 60 days of the original report date.",
  pendingAccessNotice:
    "A displayed 0 means Pending access—not zero performance—when the source required to calculate that section has not been connected. The report must name each missing source and provide a direct secure connection link.",
  enhancedFreeNotice:
    "Customers may connect supported accounts before running a free snapshot. Connected data can add limited context beyond the ordinary public-page snapshot, but the free evaluation never includes the depth, full-site analysis, cross-source validation, recommendations, or action plan of a paid advanced report.",
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
