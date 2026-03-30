/**
 * Reference usage (shadcn-style demo). Not mounted in the app — import in a page or Storybook to preview.
 */
import AvatarGroup from '@/components/ui/avatar-group'

const DEMO_ITEMS = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Jane Smith',
    designation: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Jim Beam',
    designation: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Alex Rivera',
    designation: 'Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Sam Chen',
    designation: 'Engineer',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Taylor Kim',
    designation: 'Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop',
  },
]

export default function AvatarGroupDemo() {
  return <AvatarGroup items={DEMO_ITEMS} maxVisible={5} size="sm" />
}
