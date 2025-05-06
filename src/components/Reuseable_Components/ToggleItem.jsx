import { Switch } from "../ui/switch";

const ToggleItems = ({ title, description,value,onChange }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-200">
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    {/* <Switch defaultChecked /> */}
    <Switch checked={value} onCheckedChange={onChange}
    className="data-[state=checked]:bg-[#03A9FC]"
    />
  </div>
);

export default ToggleItems;