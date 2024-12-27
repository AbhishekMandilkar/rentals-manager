import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../ui/card';
import {BarChart3Icon, Building2Icon, CheckCircleIcon, WalletIcon} from 'lucide-react';

const feats = [
    {
      "type": "card",
      "header": {
        "icon": WalletIcon,
        "title": "Lending Management",
        "description": "Track loans, calculate interest, and manage repayments all in one place."
      },
      "content": [
        {
          "icon": "CheckCircle",
          "text": "Automated interest calculations"
        },
        {
          "icon": "CheckCircle",
          "text": "Repayment tracking"
        },
        {
          "icon": "CheckCircle",
          "text": "Due date reminders"
        }
      ]
    },
    {
      "type": "card",
      "header": {
        "icon": Building2Icon,
        "title": "Rental Income",
        "description": "Manage tenants, track rent payments, and monitor property occupancy."
      },
      "content": [
        {
          "icon": "CheckCircle",
          "text": "Tenant management"
        },
        {
          "icon": "CheckCircle",
          "text": "Rent collection tracking"
        },
        {
          "icon": "CheckCircle",
          "text": "Vacancy monitoring"
        }
      ]
    },
    {
      "type": "card",
      "header": {
        "icon": BarChart3Icon,
        "title": "Analytics & Reports",
        "description": "Get insights into your business performance with detailed reports."
      },
      "content": [
        {
          "icon": "CheckCircle",
          "text": "Income analytics"
        },
        {
          "icon": "CheckCircle",
          "text": "Performance tracking"
        },
        {
          "icon": "CheckCircle",
          "text": "Export reports"
        }
      ]
    }
  ];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {feats.map((feature, index) => (
      <Card key={index}>
        <CardHeader>
          <feature.header.icon className="h-10 w-10 mb-2" />
          <CardTitle className='text-2xl'>{feature.header.title}</CardTitle>
          <CardDescription className='text-md font-geist-mono'>{feature.header.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {feature.content.map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <CheckCircleIcon className="h-4 w-4 text-primary" />
              <span>{item.text}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    ))}
  </div>
  )
}

export default FeatureCards