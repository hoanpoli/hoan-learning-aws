import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CaretDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { secondary } from '@/theme/colors';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  label: string;
  options: {label: string, url: string}[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const baseURL = 'https://staging.bcf.org.sg/';

  const handleMouseEnter = (value: string) => {
    setHoveredItem(value);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <Box
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => handleMouseEnter(label)}
        onMouseLeave={handleMouseLeave}
      >
        <Typography sx={{ 
          color: hoveredItem === label ? secondary[100] : isOpen ? 'white' : secondary[100]
        }}>
          {label}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '1.5px',
              backgroundColor: 'transparent',
              overflow: 'hidden',
              marginTop: '-2px'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: hoveredItem === label || isOpen ? '0%' : '50%',
                right: hoveredItem === label || isOpen ? '0%' : '50%',
                top: 0,
                width: hoveredItem === label || isOpen ? '100%' : '0%',
                height: '100%',
                backgroundColor:
                  hoveredItem === label && !isOpen ? secondary[100] : isOpen ? 'white' : secondary[100],
                transition: 'width 0.3s ease, left 0.3s ease',
                transform:
                  hoveredItem === label || isOpen
                    ? 'translateX(0)'
                    : 'translateX(-0%)'
              }}
            />
          </Box>
        </Typography>
        <CaretDown
          size={16}
          color={hoveredItem === label ? secondary[100] : isOpen ? 'white' : secondary[100]}
          weight='bold'
          style={{
            transition: 'transform 0.3s ease-out',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </Box>
      {isOpen && (
        <Box className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <div className={styles.dropdownItemContainer} key={index}>
              <Link
                to={baseURL + option.url}
                className={styles.dropdownItem}
                onClick={() => setIsOpen(false)}
              >
                {option.label}
              </Link>
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Dropdown;
