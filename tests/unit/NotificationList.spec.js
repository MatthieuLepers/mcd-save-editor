import { shallowMount } from '@vue/test-utils';
import NotificationList from '@/components/Notification/List';
import NotificationStore from '@/components/Notification/NotificationStore';

describe('NotificationList.vue', () => {
  it('renders success notification', () => {
    NotificationStore.success('Success');
    const wrapper = shallowMount(NotificationList);
    expect(wrapper.element.children.length).toBe(1);
  });
});
