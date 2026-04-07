import h_extraction_pipeline as h_pipe

if __name__ == "__main__":
    result = h_pipe.predict("test_image.jpg")

    print(result)