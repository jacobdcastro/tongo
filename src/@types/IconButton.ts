type Icon = 'phone' | 'directions' | 'tickets' | 'menu';

export interface IconButton {
  type: Icon;
  text: string;
  link: string;
}
