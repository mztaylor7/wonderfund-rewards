/* Import Modules */
import React, { useEffect, useState } from 'react';
/* Import Components */
import Container from '../Shared/Container/Container';
import Heading from '../Shared/Heading/Heading';
import Avatar from '../Shared/Avatar/Avatar';
import { getUserInfo } from '../../services/apiService';
import Description from '../Shared/Description/Description';
import Modal from '../Shared/Modal/Modal';

/**
 * Avatar Card Component
 * @returns {*}
 * @constructor
 */
const AvatarCard = () => {
  const [project, setProject] = useState({
    creator: '',
    rewards: [{ description: '' }],
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getUserInfo().then((response) => {
      setProject(response.data[0]);
    });
  }, []);

  /**
   * Format Username
   * Remove underscore from username
   * @returns {string}
   */
  const formatUsername = () => {
    if (project) {
      project.creator = project.creator.replace('_', ' ').replace('.', ' ');
      return project.creator;
    }

    return 'User';
  };

  /* Return the JSX to render */
  return (
    <Container activated padding='5.2rem'>
      <Avatar />
      <Heading heavy>{formatUsername()}</Heading>
      <p>1 created · 0 backed</p>
      <Description
        descOpen={false}
        activated
        setDescOpen={setModalOpen}
        description={project.rewards[0].description}
      />
      {modalOpen ? (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          project={project}
        />
      ) : (
        <> </>
      )}
    </Container>
  );
};

/* Export the component - use the withTheme hook to allow theme access inside of this component */
export default AvatarCard;
