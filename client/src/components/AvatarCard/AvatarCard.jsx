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
const AvatarCard = (props) => {
  // const [project, setProject] = useState({
  //   creator: '',
  //   rewards: '',
  // });
  const [modalOpen, setModalOpen] = useState(false);
  const { project } = props;

  // useEffect(() => {
  //   getUserInfo().then((response) => {
  //     if (response.data.length > 0) {
  //       if (typeof response.data === 'string') {
  //         JSON.parse(response.data);
  //         console.log('response.data: ', response.data)
  //       }
  //       setProject(response.data[0]);
  //     }
  //   });
  // }, []);

  /**
   * Format Username
   * Remove underscore from username
   * @returns {string}
   */
  // const formatUsername = () => {
  //   project.creator = project.creator.replace('_', ' ').replace('.', ' ');
  //   return project.creator;
  // };

  /* Return the JSX to render */
  return (
    <Container activated padding='5.2rem'>
      <Avatar />
      <Heading heavy>{project.creator}</Heading>
      <p>1 created · 0 backed</p>
      <Description
        descOpen={false}
        activated
        setDescOpen={setModalOpen}
        description={project.description}
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

/* Export the component */
export default AvatarCard;
