
import ToggleItems from "../ToggleItem";

const AppTab=({policyData,setPolicyData})=>{

    const AppData=[
       
        {
            title: "Disable Apps Installation",
            description: "Prevents apps from being installed by user.",
            key: "disableAppInstall",
          },
          {
            title: "Disable Apps Uninstallation",
            description: "Prevents apps from being uninstalled by user.",
            key: "disableAppUninstall",
          },
    ]

    return(
        <div>
            {
         AppData.map(({title,description,key})=>(
            <ToggleItems
            key={key}
            title={title}
            description={description}
            value={policyData[key]}
            onChange={(val)=>(setPolicyData({ ...policyData,[key]:val}))}
            />
            )
            )}
            
             
           
        </div>
    )
}

export default AppTab;