const SUBSCRIPTION_FEATURES = {
    free: ["basicView"],
    pro: ["basicView", "advancedReports"],
    enterprise: ["basicView", "advancedReports", "prioritySupport"],
};


  
export const hasFeature = (subscription, feature) => {
  return SUBSCRIPTION_FEATURES[subscription]?.includes(feature);
};

  