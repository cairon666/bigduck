package s3file

import (
	"io"
	"mime/multipart"
)

type (
	MetaFile struct {
		Size     int64
		Filename string
		Headers  map[string]*string
	}
	FilePut struct {
		MetaFile MetaFile
		File     multipart.File
	}
	FileGet struct {
		MetaFile MetaFile
		File     io.ReadCloser
	}
)

func NewMetaFile(size int64, filename string, headers map[string]*string) MetaFile {
	return MetaFile{
		Size:     size,
		Filename: filename,
		Headers:  headers,
	}
}

func NewFilePut(file multipart.File, meta MetaFile) *FilePut {
	return &FilePut{
		File:     file,
		MetaFile: meta,
	}
}

func NewFileGet(file io.ReadCloser, meta MetaFile) *FileGet {
	return &FileGet{
		File:     file,
		MetaFile: meta,
	}
}
