import {Box, Flex, Button, Text, Container} from "@chakra-ui/react";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import {useColorMode, useColorModeValue} from "./ui/color-mode";

export default function Navbar() {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW="900px">
      <Box
        bg={useColorModeValue("gray.100", "gray.800")}
        px={6}
        py={3}
        my={4}
        borderRadius="xl"
        boxShadow="md"
      >
        <Flex h={16} alignItems="center" justify="center" gap={6}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "gray.100")}
          >
            Daily Tasks
          </Text>

          <Button
            onClick={toggleColorMode}
            borderRadius="full"
            size="sm"
            bg={useColorModeValue("gray.200", "gray.600")}
            _hover={{bg: useColorModeValue("gray.300", "gray.500")}}
          >
            {colorMode === "light" ? (
              <IoMoon color="#333" />
            ) : (
              <LuSun size={20} color="#eee" />
            )}
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}
