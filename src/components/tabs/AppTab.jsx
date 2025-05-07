
import ToggleItems from "../Reuseable_Components/ToggleItem";

const AppTab=({policyData,setPolicyData})=>{

    const AppData=[
       
        {
            title: "Disable Apps Installation",
            description: "Prevents apps from being installed by user.",
            key: "disableAppInstall",
            section: "restrictions",
          },
          {
            title: "Disable Apps Uninstallation",
            description: "Prevents apps from being uninstalled by user.",
            key: "disableAppUninstall",
            section: "restrictions",
          },
    ]

    return(
        <div>
            {
         AppData.map(({title,description,key,section})=>(
            <ToggleItems
            key={key}
            title={title}
            description={description}
            value={policyData.data?.[section]?.[key] || false}
            onChange={(val)=>(
                setPolicyData({ 
                ...policyData,
                data:{
                    ...policyData.data,
                    [section]:{
                        ...policyData.data[section],
                            [key]:val
                        }
                }
                

            }))}
            />
            )
            )}
            
             
           
        </div>
    )
}

export default AppTab;