import {
  CheckIcon,
  WifiIcon,
  UserGroupIcon,
  BookOpenIcon,
  DeviceTabletIcon,
  AdjustmentsVerticalIcon,
  BanknotesIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';

export interface FilterData {
  id: string;
  name: string;
  explanation: string;
  options: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
  type: string;
  icon?: React.ElementType; // Add icon field to the FilterOption interface
}
// Example data for the 'Geography' filter
export const typeFilterData: FilterData = {
  id: 'type',
  name: 'Type',
  explanation: 'Select one or more counties to see resources available in those areas.',
  options: [
    {
      value: 'Digitial Skills (Classes and Training)',
      label: 'Digitial Skills (Classes and Training)',
      checked: false,
      type: 'Type',
      icon: BookOpenIcon,
    },
    {
      value: 'Device Access',
      label: 'Device Access',
      checked: false,
      type: 'Type',
      icon: DeviceTabletIcon,
    },
    {
      value: 'Digital Skills',
      label: 'Digital Skills',
      checked: false,
      type: 'Type',
      icon: CheckIcon,
    },
    {
      value: 'Public Device & Internet Access',
      label: 'Public Device & Internet Access',
      checked: false,
      type: 'Type',
      icon: WifiIcon,
    },
    {
      value: 'Virtual Support',
      label: 'Virtual Support',
      checked: false,
      type: 'Type',
      icon: ChatBubbleOvalLeftIcon,
    },
    {
      value: 'Digital Skills & Technical Support',
      label: 'Digital Skills & Technical Support',
      checked: false,
      type: 'Type',
      icon: UserGroupIcon,
    },
    {
      value: 'Digital Inclusion Funding',
      label: 'Digital Inclusion Funding',
      checked: false,
      type: 'Type',
      icon: BanknotesIcon,
    },
    {
      value: 'Digital Navigation',
      label: 'Digital Navigation',
      checked: false,
      type: 'Type',
      icon: AdjustmentsVerticalIcon,
    },
  ],
};

// Example data for the 'Geography' filter
export const geographyFilterData: FilterData = {
  id: 'geography',
  name: 'County',
  explanation: 'Select one or more counties to see resources available in those areas.',
  options: [
    {
      value: 'Alamance',
      label: 'Alamance',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Alexander',
      label: 'Alexander',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Alleghany',
      label: 'Alleghany',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Anson',
      label: 'Anson',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Ashe',
      label: 'Ashe',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Avery',
      label: 'Avery',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Beaufort',
      label: 'Beaufort',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Bertie',
      label: 'Bertie',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Bladen',
      label: 'Bladen',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Brunswick',
      label: 'Brunswick',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Buncombe',
      label: 'Buncombe',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Burke',
      label: 'Burke',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Cabarrus',
      label: 'Cabarrus',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Caldwell',
      label: 'Caldwell',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Camden',
      label: 'Camden',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Carteret',
      label: 'Carteret',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Caswell',
      label: 'Caswell',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Catawba',
      label: 'Catawba',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Chatham',
      label: 'Chatham',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Cherokee',
      label: 'Cherokee',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Chowan',
      label: 'Chowan',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Clay',
      label: 'Clay',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Cleveland',
      label: 'Cleveland',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Columbus',
      label: 'Columbus',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Craven',
      label: 'Craven',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Cumberland',
      label: 'Cumberland',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Currituck',
      label: 'Currituck',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Dare',
      label: 'Dare',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Davidson',
      label: 'Davidson',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Davie',
      label: 'Davie',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Duplin',
      label: 'Duplin',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Durham',
      label: 'Durham',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Edgecombe',
      label: 'Edgecombe',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Forsyth',
      label: 'Forsyth',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Franklin',
      label: 'Franklin',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Gaston',
      label: 'Gaston',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Gates',
      label: 'Gates',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Graham',
      label: 'Graham',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Granville',
      label: 'Granville',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Greene',
      label: 'Greene',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Guilford',
      label: 'Guilford',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Halifax',
      label: 'Halifax',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Harnett',
      label: 'Harnett',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Haywood',
      label: 'Haywood',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Henderson',
      label: 'Henderson',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Hertford',
      label: 'Hertford',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Hoke',
      label: 'Hoke',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Hyde',
      label: 'Hyde',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Iredell',
      label: 'Iredell',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Jackson',
      label: 'Jackson',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Johnston',
      label: 'Johnston',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Jones',
      label: 'Jones',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Lee',
      label: 'Lee',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Lenoir',
      label: 'Lenoir',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Lincoln',
      label: 'Lincoln',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Macon',
      label: 'Macon',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Madison',
      label: 'Madison',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Martin',
      label: 'Martin',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'McDowell',
      label: 'McDowell',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Mecklenburg',
      label: 'Mecklenburg',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Mitchell',
      label: 'Mitchell',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Montgomery',
      label: 'Montgomery',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Moore',
      label: 'Moore',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Nash',
      label: 'Nash',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'New Hanover',
      label: 'New Hanover',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Northampton',
      label: 'Northampton',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Onslow',
      label: 'Onslow',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Orange',
      label: 'Orange',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Pamlico',
      label: 'Pamlico',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Pasquotank',
      label: 'Pasquotank',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Pender',
      label: 'Pender',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Perquimans',
      label: 'Perquimans',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Person',
      label: 'Person',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Pitt',
      label: 'Pitt',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Polk',
      label: 'Polk',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Randolph',
      label: 'Randolph',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Richmond',
      label: 'Richmond',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Robeson',
      label: 'Robeson',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Rockingham',
      label: 'Rockingham',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Rowan',
      label: 'Rowan',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Rutherford',
      label: 'Rutherford',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Sampson',
      label: 'Sampson',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Scotland',
      label: 'Scotland',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Stanly',
      label: 'Stanly',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Stokes',
      label: 'Stokes',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Surry',
      label: 'Surry',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Swain',
      label: 'Swain',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Transylvania',
      label: 'Transylvania',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Tyrrell',
      label: 'Tyrrell',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Union',
      label: 'Union',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Vance',
      label: 'Vance',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Wake',
      label: 'Wake',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Warren',
      label: 'Warren',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Washington',
      label: 'Washington',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Watauga',
      label: 'Watauga',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Wayne',
      label: 'Wayne',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Wilkes',
      label: 'Wilkes',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Wilson',
      label: 'Wilson',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Yadkin',
      label: 'Yadkin',
      checked: false,
      type: 'Geography',
    },
    {
      value: 'Yancey',
      label: 'Yancey',
      checked: false,
      type: 'Geography',
    },
  ],
};
