import { ClockCircleTwoTone, CloudTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { classNames } from '../utils';

interface IHomeDataMenuProps {
  classNames?: string;
  currentMenu: string;
  setCurrentMenu: (currentMenu: string) => void;
}

const items: MenuProps['items'] = [
  {
    label: 'Statistics',
    key: 'statistics',
    icon: <CloudTwoTone />,
  },
  {
    label: 'History',
    key: 'history',
    icon: <ClockCircleTwoTone />,
  },
]

export const HomeDataMenu = (props: IHomeDataMenuProps) => {

  const onClick: MenuProps['onClick'] = (e) => {
    props.setCurrentMenu(e.key);
  };

  return (
    <Menu className={classNames(props.classNames, "justify-center")} onClick={onClick} selectedKeys={[props.currentMenu]} mode="horizontal" items={items} />
  )
}
