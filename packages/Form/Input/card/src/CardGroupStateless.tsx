import React, {
  Children,
  cloneElement,
  ComponentProps,
  createElement,
  isValidElement,
  ReactNode,
} from 'react';
import CardMeta from './CardMeta';

const classnames = (...classes: string[]) =>
  classes.filter((c) => !!c).join(' ');

/**
 *
 * @param {title} can be a string or a jsx Element
 * Return a jsx title
 */
const formatTitle = (titleParam: ReactNode) => {
  if (isValidElement(titleParam)) {
    return cloneElement(titleParam, {
      className: classnames(
        titleParam.props.className,
        'af-rccard-group__title'
      ),
    });
  }
  return createElement(
    'h3',
    { className: 'af-rccard-group__title' },
    titleParam
  );
};
type Card = typeof import('./Card').default;
type Props = Omit<
  ComponentProps<Card>,
  'nbCards' | 'children' | 'title' | 'id'
> & {
  title?: ReactNode | string;
  propClassName?: string;
  values?: string[];
  children?: ReactNode;
};
const CardGroupStateless = ({
  title,
  className,
  type = 'radio',
  children,
  values,
  value,
  disabled,
  ...otherProps
}: Props) => {
  const childrenArray = Children.toArray(children);
  const indexMeta = childrenArray.findIndex(
    (child) => isValidElement(child) && child.type === CardMeta
  );
  const childrenMeta = childrenArray[indexMeta];
  const childrenWithoutMeta = childrenArray.slice();
  if (indexMeta !== -1) childrenWithoutMeta.splice(indexMeta, 1);
  const nbCards = childrenWithoutMeta.length;

  const childrenWithProps = Children.map(childrenWithoutMeta, (child) => {
    if (isValidElement(child)) {
      const isChecked = values
        ? values.includes(child.props.value)
        : value === child.props.value;

      return cloneElement(child, {
        type,
        isChecked,
        disabled: child.props.disabled || disabled,
        ...otherProps,
      });
    }
    return child;
  });

  return (
    <div className={classnames(`af-rccard__${nbCards}`, className)}>
      {childrenMeta}

      {title && formatTitle(title)}
      <div className="af-rccard-group__content">{childrenWithProps}</div>
    </div>
  );
};
export default CardGroupStateless;
