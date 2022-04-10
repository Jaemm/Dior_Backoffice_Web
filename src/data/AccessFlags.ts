import { useUserState } from './UserState';

type Roles =
  | 'Super Admin'
  | 'Admin'
  | 'Brand Manager'
  | 'Assistant'
  | 'Account Manager'
  | 'General Manager'
  | 'Beauty Manager'
  | 'Agent'
  | undefined;

export function useAccessFlags() {
  const { consultant_position: { name } = {} } = useUserState();
  const position = name as Roles;

  return {
    has_access_to_analysis_information_row_value: position === 'Super Admin',
    has_access_to_brand_details_customer_record: position === 'Brand Manager',
    has_access_to_brand_details:
      position === 'Admin' ||
      position === 'Super Admin' ||
      position === 'Agent',
    has_access_to_registered_devices:
      position === 'Admin' || position === 'Super Admin',
    has_access_to_statistics:
      position === 'Admin' || position === 'Super Admin',
    // position === 'Brand Manager',
  };
}
