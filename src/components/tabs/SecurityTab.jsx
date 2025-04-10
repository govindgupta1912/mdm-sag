import ToggleItems from "../ToggleItem";


const SecurityTab = ({policyData,setPolicyData}) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">Basic Security Restrictions</h3>
        <ToggleItems 
        title="Disable location sharing"
        description="This is a test for the policy feature title details description"
        value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disabledLocation: val })}
         />
        <ToggleItems 
        title="Disable factory reset" 
        description="This is a test for the policy feature title details description" 
        value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disableLocation: val })}
        />
        <ToggleItems 
        title="Disable microphone" 
        description="This is a test for the policy feature title details" 
        value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disableLocation: val })}
        />
        <ToggleItems 
        title="Disable bluetooth" 
        description="This is a test for the policy feature title details"
        value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disableLocation: val })}
        />
      </div>
  
      <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">Critical Security Restrictions</h3>
        <ToggleItems
         title="Disable keyguard"
          description="This is a test for the policy feature title details"
          value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disableLocation: val })}
         />
        <ToggleItems 
        title="Disable fingerprint unlock" 
        description="This is a test for the policy feature title details"
        value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disableLocation: val })} />
        <ToggleItems 
        title="Disable screen capture" 
        description="This disables screen recording and taking screenshot." 
        value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disableLocation: val })}
        />
        <ToggleItems 
        title="Disable Camera"
         description="Disable camera for all apps"
         value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disableLocation: val })}
         />
      </div>
    </div>
  );

  export default SecurityTab;