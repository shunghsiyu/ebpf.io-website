import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';

import Link from 'components/shared/link';
import useClickOutside from 'hooks/use-click-outside';
import ChevronIcon from 'icons/chevron.inline.svg';

import { languages } from '../../../../../config/languages';

const LanguageSelect = ({ lang, pageUrls }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleClickOutside = useCallback(() => {
    setShowDropdown(false);
  }, [setShowDropdown]);

  useClickOutside([dropdownRef], handleClickOutside);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="inline-flex items-center justify-center py-5 text-sm font-medium leading-none text-black hover:text-gray-40"
        type="button"
        aria-label="Select language"
        onClick={handleDropdown}
      >
        {languages[lang].name}
        <ChevronIcon
          className={clsx('ml-1.5 mt-1 h-auto w-2.5', showDropdown ? 'rotate-180' : 'rotate-0')}
        />
      </button>
      <ul
        className={clsx(
          'absolute right-0 top-full z-10 flex w-[136px] flex-col bg-white py-2.5 transition-opacity duration-200',
          showDropdown ? 'visible opacity-100' : 'hidden opacity-0'
        )}
        style={{
          boxShadow: '0px 2px 6px rgba(28, 23, 23, 0.04), 0px 5px 14px rgba(28, 23, 23, 0.1)',
        }}
      >
        {Object.values(languages)
          .filter(({ code }) => code !== lang)
          .map(({ name, code }) => {
            let url = code === 'en' ? '/' : `/${code}/`;
            if (pageUrls) url = pageUrls[code];

            return (
              <li className="flex" key={name}>
                <Link
                  className="flex whitespace-nowrap px-5 py-2.5 text-[15px] font-medium leading-none lg:text-sm"
                  theme="black"
                  to={url}
                >
                  {name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

LanguageSelect.propTypes = {
  lang: PropTypes.string.isRequired,
  pageUrls: PropTypes.shape(
    Object.keys(languages).reduce((acc, lang) => {
      acc[lang] = PropTypes.string.isRequired;
      return acc;
    }, {})
  ),
};

LanguageSelect.defaultProps = {
  pageUrls: null,
};

export default LanguageSelect;
